import {useState, useRef, useEffect} from "react";
import { useFetchingContext } from "./context/FetchingData";
import "../assets/css/dates.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPenToSquare,
  faXmark,
  faFloppyDisk,
  faSquarePlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { Image, formatDate, ImgInputField, InputField, DateInputField } from "./tools/special-tools";

function Item({item, setCurrentId}) {
  // to show the items we have in stock
  return (
    <div
      className="item"
      onClick={setCurrentId}>
      <div className="item-img">
        <Image imgSrc={item.url} imgName={item.name} />
      </div>
      <div className="info">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-date">
          EX:{" "}
          {item.date.length === 1
            ? formatDate(item.date[0]) // if the dates array has one date, then return that date
            : item.date.length > 1 
              ? formatDate(
                // if not, then return the most recent date
                item.date.reduce((prevDate, currentDate) =>
                  currentDate < prevDate ? currentDate : prevDate
                )
              ) : null
            }
          {item.date.length > 1 && ( // if the returned date > 1 return a span to show how many date we have for the item
            <span className="moreDates">{`+ ${item.date.length - 1}`}</span>
          )}
        </span>
        <span className="item-auther">{item.auther}</span>
      </div>
    </div>
  );
}

function EditItem({item, setEditMood}) {
  const [currentItem, setCurrentItem] = useState({...item}); // take a copy from the current item to work localy and avoid issues
  const dateInputRef = useRef('');
  const saveEditMood = (e) => {
    e.preventDefault();
    setEditMood(false);
  };

  function handleAddDateBtn() {
    // when the add date btn clicked, update the dates list
    let dateInput = dateInputRef.current;
    if (!dateInput.value) return dateInput.focus();
    if (!currentItem.date.includes(dateInput.value)) {
      let currentDate = dateInput.value;
      setCurrentItem((prev) => ({
        ...prev,
        date: [...prev.date, currentDate],
      }))
    }
    dateInput.value = '' // clear the date input after add the date
  }

  function handleRemoveBtn(itemDate) { // remove the date when click the remove btn
    setCurrentItem((prev) => ({
      ...prev,
      date: currentItem.date.filter((date) => date !== itemDate),
    }));
  }

  function handleImageChange(e) {
    setCurrentItem(prev => ({...prev, url: require("../assets/products-images/" + e.target.files[0].name)}));
  }

  return (
    <form
      className="edit-currentItem"
      onSubmit={saveEditMood}>
      <div className="slider-img">
        <Image imgSrc={currentItem.url} imgName={currentItem.name} />
      </div>
      <div className="img-input">
        <ImgInputField onChange={handleImageChange}>Change The Image</ImgInputField>
      </div>
      <div className="name-input">
        <InputField
        type="text"
        value={currentItem.name}
        maxLength="35"
        onChange={e => setCurrentItem(prevItem => ({...prevItem, name: e.target.value}))}>
          Item Name:
        </InputField>
      </div>
      <div className="date-input">
        <DateInputField ref={dateInputRef}>
          Expiry Date:
        </DateInputField>
        <span
          className="date-btn"
          onClick={handleAddDateBtn}>
          <FontAwesomeIcon icon={faSquarePlus} />
        </span>
      </div>
      {currentItem.date.length >= 1 ? (
        <ul className="multiDates dates-list">
          {currentItem.date.map(itemDate => (
            <li key={itemDate}>
              {formatDate(itemDate)}
              <span
                className="remove-date-btn"
                onClick={() => handleRemoveBtn(itemDate)}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </li>
          ))}
        </ul>
        ) : null
        }
      <button
        type="submit"
        className="slider-edit">
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
    </form>
  );
}

function ShowItem({item, setEditMood}) {
  return (
    <div className="currentItem">
    <div className="slider-img">
      <Image imgSrc={item.url} imgName={item.name} />
    </div>
    <div
      className="slider-edit"
      onClick={() => setEditMood(true)}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </div>
    <div className="info">
      <h3 className="slider-name">
        Item Name: <span className="special">{item.name}</span>
      </h3>
      <span className="slider-date">
        Expiry Date:{" "}
        {!Array.isArray(item.date) ? (
          <span className="special">{formatDate(item.date)}</span>
        ) : (
          <ul className="multiDates">
            {item.date.map((itemDate, index) => (
              <li key={index}>{formatDate(itemDate)}</li>
            ))}
          </ul>
        )}
      </span>
      <span className="slider-auther">
        Added By: <span className="special">{item.auther}</span>
      </span>
      <div className="delete-item-btn">
      <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  </div>
  )
}

function ItemSlider({itemsList, currentId, setCurrentId}) { // this slider shows the item when clicking it
  const [editMood, setEditMood] = useState(false);

  return (
    <div className="slider">
      {itemsList.map((item) => {
        return item.id === currentId ? (
          <div
            className="slider-item"
            key={item.id}>
            <div
              className="slider-close"
              onClick={() => setCurrentId(null)}>
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <div
              className={
                "go-back " + (currentId === 1 || editMood ? "disabled" : "")
              }
              onClick={() =>
                !editMood
                  ? setCurrentId((prevId) =>
                      prevId !== 1 ? prevId - 1 : prevId
                    )
                  : ""
              }>
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            {editMood ? <EditItem item={item} setEditMood={setEditMood} /> : <ShowItem item={item} setEditMood={setEditMood} />}
            <div
              className={
                "go-next " +
                (currentId === itemsList.length || editMood ? "disabled" : "")
              }
              onClick={() =>
                !editMood
                  ? setCurrentId((prevId) =>
                      prevId !== itemsList.length ? prevId + 1 : prevId
                    )
                  : ""
              }>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </div>
        ) : null;
      })}
    </div>
  );
}

function ShowItems({itemsFound, items}) {
  const [currentId, setCurrentId] = useState(null);
  if (!items) return <h1 style={{color: 'red'}}>something went wrong, make sure you are signing in currectly!</h1>
  if (items.length === 0) return <p style={{color: 'red', fontSize: "25px", fontWeight: 'bold'}}>loading...</p>
  return (
    <>
    <h3 className="itemsFound-status">
      {itemsFound.length !== 0 ? itemsFound.length + ' Items Found' : 'No Items Found!'}
    </h3>
    <div className="items-section">
      {itemsFound.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            setCurrentId={() => setCurrentId(item.id)}
          />
        );
      })}
    </div>
    {
      currentId ? (
        <>
          <div className="overlay"></div>
          <ItemSlider
            itemsList={items}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        </>
      ) : null
    }
    </>
  )
}

export default function Dates() {
  const [items] = useFetchingContext();
  const [itemsFound, setItemsFound] = useState(() => items? [...items] : []);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const regEx = new RegExp(searchValue.toLowerCase().trim(), 'g');
    setItemsFound(items.filter(item => (item.name.toLowerCase().match(regEx) || item.date.filter((d) => formatDate(d).match(regEx)).length > 0 ? true : false || item.auther.toLowerCase().match(regEx))))
  }, [searchValue, items]);

  return (
    <div className="dates">
      <div className="search-section">
        <div className="search-sec">
          <input
            className="search-box"
            type="text"
            placeholder="type to search.."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <ShowItems itemsFound={itemsFound} items={items}/>
    </div>
  );
}



