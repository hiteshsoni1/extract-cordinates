import { useRef, useState } from "react";
import './App.css'

const createShape = (top, left) => {
  const el = document.createElement('div');
  el.className = 'extract-box';
  el.style.top = `${top}px`;
  el.style.left = `${left}px`;
  return el
}

const App = () => {
  const [img, setImg] = useState('');
  const [list, setList] = useState([]);

  const imgRef = useRef(null);
  const rectangleRef = useRef(null)

  const initialCordinates = {}
  let rectCordinates = {};
  let mouseDown = false;

  const onMounseDown = (e) => {
    mouseDown = true
    const shape = createShape(e.pageY, e.pageX);
    rectangleRef.current = shape;
    initialCordinates.x = e.pageX;
    initialCordinates.y = e.pageY;
    imgRef.current.appendChild(shape);
  }

  const onMpuseMove = (e) => {
    const { x, y } = initialCordinates;
    let width = e.pageX - x;
    let height = e.pageY - y;
    rectCordinates = {
      top: y,
      left: x,
      right: e.pageX,
      bottom: e.pageY
    }

    if (height < 0) {
      height = Math.abs(height)
      rectangleRef.current.style.top = `${e.pageY}px`;
      rectCordinates.top = e.pageY;
      rectCordinates.bottom = y;
    }
    if (width < 0) {
      width = Math.abs(width)
      rectangleRef.current.style.left = `${e.pageX}px`;
      rectCordinates.left = `${e.pageX}px`;
      rectCordinates.right = x
    }
    rectangleRef.current.style.height = `${height}px`;
    rectangleRef.current.style.width = `${width}px`;
  }

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImg(URL.createObjectURL(e.target.files[0]));
      removeAllChild();
      setList([])
    }
  }

  const onMouseUp = (e) => {
    mouseDown = false;
    if (!rectangleRef.current.style.height) {
      imgRef.current.removeChild(rectangleRef.current)
      return
    }
    setList([...list, rectCordinates])
    rectCordinates = {};
  }

  const removeAllChild = () => {
    const items = document.getElementsByClassName('extract-box')
    while (items[0]) {
      items[0].parentNode.removeChild(items[0]);
    }
  }

  return <div className="outer" id="main">
    {img && <div className='image-wrapper'
      ref={imgRef}
      onMouseMove={(e) => mouseDown && onMpuseMove(e)}
      onMouseUp={onMouseUp}>
      <img src={img}
        height={500}
        alt='img'
        onMouseDown={onMounseDown} />
    </div>
    }
    {
      list.map((el, index) => {
        return <div key={index} className='extract-cordinates'>
          <span>Equation Rectangle:</span>
          <span>{`x1: ${el.left},  y1: ${el.top},  x2: ${el.right},  y2: ${el.bottom} `}</span>
        </div>
      })
    }
    <label className="add-button" htmlFor="add-button">
      <div >Add Image</div>
    </label>
    <input
      type="file"
      id="add-button"
      style={{ display: "none" }}
      onChange={handleChange}
    />
  </div>
}

export default App;