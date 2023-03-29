import { useEffect, useRef, useState } from "react"

const apiUrl = "https://jsonplaceholder.typicode.com/users"
export default function App() {
  const [timer, setTimer] = useState(1)
  const [users, setUsers] = useState([])
  const fetchInitiallyOnce = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000);
    if (fetchInitiallyOnce.current === false) {
      fetchData()
      fetchInitiallyOnce.current = true
    }
    if (timer > 10) {
      fetchData()
      setTimer(1)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [timer])

  const fetchData = () => {
    fetch(apiUrl).then(res => res.json()).then(data => { console.log("fetched data", data); setUsers(data); }).catch(err => { console.log(err) })
  }

  const renderObject = (obj = {}) => {
    return Object.keys(obj).map((key, keyIndex) => {
      if (typeof obj[key] === "object") {
        return renderObject(obj[key])
      } else {
        return <section key={key + keyIndex}>{obj[key]}</section>
      }
    })
  }

  return (
    <div className="App">
      <section>
        <h3>{timer}</h3>
      </section>
      {users.map((user, userIndex) => (
        <article key={user + userIndex} style={{ border: "1px solid" }}>
          {renderObject(user)}
        </article>
      ))}
    </div>
  );
}
