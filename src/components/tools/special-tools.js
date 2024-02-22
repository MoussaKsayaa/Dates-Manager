import React from "react";
import notFoundImg from "../../assets/images/img-not-found.png";

export const Image = ({imgSrc, imgName, defaultImg = notFoundImg}) => 
    <img
      src={imgSrc || defaultImg}
      alt={imgName || 'image not found!'}
      onError={(e) => (e.target.src = defaultImg)}
    />

// to format the date from 2024-10-04 to 04/10/2024
export function formatDate(date) {
  return date.split("-").reverse().join("/");
}

export const ImgInputField = ({onChange, children}) => 
  <>
    <label>{children}
    <input
      type="file"
      accept="image/*"
      onChange={onChange}
    />
    </label>
  </>

export const InputField = ({value='', onChange, children, ...otherProps}) => 
  <>
    <label>{children} {' '}
      <input
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </label>
  </>

export const DateInputField = React.forwardRef(({onBlur, onChange, required=false, children}, ref) =>
    <>
      <label>{children} {' '}
      <input
        type='date'
        ref={ref}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
      />
      </label>
    </>
)