import React, { useEffect, useState } from 'react'
import "../Pages/style.css"
import logo from "../assets/images/logo.png"

const Home = () => {
  const [data, setData] = useState([])
  const [state, setState] = useState('')
  const [first, setFirst] = useState(true)
  const [arr, setArr] = useState('')
  const [active, setActive] = useState(0);
  const [genre, setGenre] = useState([]);
  const [search, setSearch] = useState('');

  const checkboxes = ["Regional", "National", "International"];

  //Api Fetch
  useEffect(() => {
    const url = " https://jsonmockserver.vercel.app/api/blogs";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (genre.length === 0 && !arr) {
          setData(json)
        } else if (genre.length === 0 && arr) {
          setData(json.filter(item => item.title.includes(arr)))
        } else {
          setData(json.filter(data =>
            genre.some(category => [data.type].flat().includes(category))).filter(item => item.title.includes(arr))
          )
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [genre, arr]);

  const handleCheckbox = (e, item) => {
    if (e.target.checked) {
      setGenre([...genre, item]);
    } else {
      setGenre(genre.filter(id => id !== item));
    }
  };

  const submit = () => {
    setArr(search);
  }

  const handleSearch = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value);
  }

  return (
    <div className="single-page">
      <div className="row">
        <div className="col-2 sidebar">
          <div className='sidebar-content'>
            <div className='row'>
              <div className='col' style={{ "height": "40vh", }}>
                <img src={logo} className="logo" alt="little book" />
              </div>
              <div className='col'>
                <div className='filter'>
                  <h1>FILTER</h1>
                  <div className='radio-list'>
                    {checkboxes.map((item, index) => (console.log('item', item),
                      <div className='radio'>
                        <input type="checkbox" className='radio-btn'
                          onChange={(e) => handleCheckbox(e, item)}
                          name={item} />
                        <span key={index}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4 layout">
          <div className='search-card'>
            <div className='search-btn'>
              <input type="text" className="input"
                placeholder=" Search Blogs" name="search"
                value={search}
                onChange={handleSearch}
              />
              <button className="submit"
                onClick={submit}
              >Search</button>
            </div>
            <div className='cards'>
              {data.map((item, index) => (
                <div onClick={() => {
                  setActive(index)
                  setFirst(false)
                  setState(item)
                }
                }
                  className={`card ${active === index ? "active" : ``}`}
                // id={index}
                >
                  <div className={"card-body"} key={item.title}>
                    <h3 className="card-title">{item.title}</h3>
                    <h4 className="card-type"> {item.type} </h4>
                    <p className='short-details'>{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className='preview'>
            {first ? <div className="preview-cards">
              <img src={data[0]?.photo} className="card-img-top" alt="..."  width="460" height="345" onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
              }} />
              <div className="card-body">
                <h1>
                  {data[0]?.title}
                </h1>
                <p className="card-text">
                  {data[0]?.details}
                </p>
              </div>
            </div> : <div className="preview-cards">
              <img src={state.photo} className="card-img-top" alt="..." width="460" height="345" onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
              }} />
              <div className="card-body">
                <h1>
                  {state.title}
                </h1>
                <p className="card-text">
                  {state.details}
                </p>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
