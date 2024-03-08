import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const Main = () => {
 
 const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:8080/api/users')
      .then((response) => {
        setUser(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1> Welcome To Dashboard</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
          

            {loading ? (
        <div> error</div>
      ) : (
        <div className={styles.tablediv}><table>
          <thead>
          <tr>
          <th >No</th>
          <th >Name</th>
          <th >Email </th>
          <th > Last login Time </th>
          <th >Last LogOut Time</th>
          </tr>

          </thead>
          <tbody>
          {user.map((user, index) => (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.firstName}</td>
            <td>{user.email}</td>
              
            {/* <td>{user.loginHistory.loginTime}</td> */}
            <td>{new Date(user.loginTime).toLocaleTimeString()}</td>
             <td>{new Date(user.logOutTime).toLocaleTimeString()}</td>
            
          </tr>
        ))}
          </tbody>
        </table>
        </div>
      )}


		</div>
	);
};

export default Main;