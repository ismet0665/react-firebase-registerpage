import "./Home.css";
const Home = ({ users }) => {
  return <div className="home">WELCOME {users?.email}</div>;
};

export default Home;
