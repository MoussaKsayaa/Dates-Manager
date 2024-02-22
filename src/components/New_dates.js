import {useState, useRef, useEffect} from "react";
import {useFetchingContext} from "./context/FetchingData";
import "../assets/css/newdates.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { Image, formatDate, ImgInputField, InputField, DateInputField } from "./tools/special-tools";
import notFoundImg from "../assets/images/img-not-found.png"


export default function Newdates() {
  const [items] = useFetchingContext(); // #important: we need to update the data when the database built
  const dateInputRef = useRef('');
  const [newDate, setNewDate] = useState({
    id: '',
    name: "",
    url: notFoundImg,
    auther: "moussa",
    date: []
  });
  const [newDatesList, setNewDatesList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [dateInputValue, setDateInputValue] = useState('');

  useEffect(() => {
    if (items && items.length > 0) setNewDate(prev => ({...prev, id: (items[items.length-1].id + 1)}));
  }, [items]);
  useEffect(() => {
    if (newDate.id !=='' && newDate.name !== '' && (newDate.date.length > 0 || dateInputValue.match(/\d{4}-\d{2}-\d{2}/))) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [newDate, dateInputValue]);

  function handleSubmitAddItem(e) {
    e.preventDefault();
    if (!items || items.length === 0) return;
    setDateInputValue('');
    setNewDatesList(prev => [...prev, newDate])
    setNewDate({
      id: (items[items.length-1].id + 1),
      name: "",
      url: notFoundImg,
      auther: "moussa",
      date: []
    });
    dateInputRef.current.value = '';
  }

  function handleRemoveBtn(itemDate) {
    setNewDate(prev => ({...prev, date: prev.date.filter(d => d !== itemDate)}))
  }

  function removeItemFromCurrentListOnClick(currItemId) {
    setNewDatesList(prev => prev.filter(item => item.id !== currItemId));
  }

  function onDateInputBlur() {
    const inputref = dateInputRef.current;
    if (inputref.value !== '' && !newDate.date.includes(inputref.value)) {
      let currentData = inputref.value;
      setNewDate(prev => ({...prev, date: [...prev.date, currentData]}));
      }
    inputref.value = '';
    setDateInputValue('');
  }

  if (!items) return null;
  return (
    <div className="newdate">
      <form
        className="newdate-box"
        onSubmit={handleSubmitAddItem}>
        <div className="img-sec">
        <Image imgSrc={newDate.url} imgName={newDate.name} />
        <ImgInputField 
        onChange={e => setNewDate(prev => ({...prev, url: require('../assets/products-images/' + e.target.files[0].name)}))}>
          Select Image
        </ImgInputField>
        </div>
        <div className="info-sec">
          <div className="name-sec">
            <InputField
            required
            type="text"
            maxLength="35"
            value={newDate.name}
            onChange={e => setNewDate(prev => ({...prev, name: e.target.value}))}>
              Item Name:
            </InputField>
          </div>
          <div className="date-sec">
            <DateInputField
            required={newDate.date.length === 0 ? true : false}
            ref={dateInputRef}
            onBlur={onDateInputBlur}
            onChange={() => setDateInputValue(dateInputRef.current.value)}>
              Expiry Date:
            </DateInputField>
          </div>
          <ul className="show-dates">
            {newDate.date.length > 0 ? newDate.date.map((d) => (
              <li key={d}>
                {formatDate(d)} 
                <span
                  className="remove-date-btn"
                  onClick={() => handleRemoveBtn(d)}>
                  <FontAwesomeIcon icon={faXmark} />
              </span>
              </li>
            )) : null
          }
          </ul>
          <button type="submit" className={`add-new-btn ${isActive ? 'active' : ''}`} disabled={isActive? false : true}>Add Item</button>
        </div>
      </form>
      <ul className="added-dates">
        {newDatesList && newDatesList.map(item => (
          <li key={item.id}>
            <div className="img">
              <Image imgSrc={item.url} imgName={item.name} />
            </div>
            <div className="info">
              <div className="item-name">Item Name: <span>{item.name}</span></div>
              <div className="item-dates">Expiry Date: 
              <div>{item.date.map(date => <span key={date}>{formatDate(date)}</span>)}</div>
              </div>
            </div>
            <div className="remove-btn" onClick={() => removeItemFromCurrentListOnClick(item.id)}><FontAwesomeIcon icon={faXmark} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
