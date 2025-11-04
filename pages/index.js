import { useState } from "react";
import styles from "@/styles/Home.module.css";

const Home = ({ lottowinners }) => {
  const [winners, setWinners] = useState(lottowinners);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [winMessage, setWinMessage] = useState("");



  //the numbers selected by he users 
  const handleNumberSelect = (number) => {
    if (selectedNumbers.length < 3 && !selectedNumbers.includes(number)) {
      setSelectedNumbers([...selectedNumbers, number]);


    }
  

};

  // the amount the user is betting 
  const handleBet = (amount) => {
    
    setBetAmount(betAmount + amount);
  };

  // winner button press 
  const handleWinnerCheck = () => {
    if (selectedNumbers.length !== 3 || betAmount === 0) {
      setErrorMessage("Please select 3 numbers and place a bet.");
      setWinMessage("");
      return;
    }


    const sortedWinners = [...winners].sort((a, b) => a - b);
    const sortedSelected = [...selectedNumbers].sort((a, b) => a - b);

    
    
    console.log(`Winners: ${winners}` );



    // checking of if the slected numbers and the winnning numbers are the same and assigning the value to a vartiable is winner 
    const isWinner = JSON.stringify(sortedWinners) === JSON.stringify(sortedSelected);

//checking if the value is true 
    if (isWinner) {
      setWinMessage(`Congradulations, You won!!!!!!!!! $${betAmount}. The winning Numbers: ${winners}`);
    } else {
      setWinMessage(`Sorry Try again next time . The winning Numbers: ${winners}`);
    }
  };

  // Reset the game to play again 

  const handleReset = () => {
    setSelectedNumbers([]);//empty array 
    setBetAmount(0);//set bet value to 0
    setErrorMessage("");
    setWinMessage("");
  };

  return (
    <div className={styles.container}>
      <h1>Lottery Game</h1>

     

      
      <div>
        <h2>Select 3 Numbers:</h2>
        {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((number) => (
          <button
            key={number}
            className={styles.button}
            onClick={() => handleNumberSelect(number)}
            disabled={selectedNumbers.includes(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <div>
        <h2>Selected Numbers:</h2>
        <p>{selectedNumbers.join(", ")}</p>
      </div>

     




      <div>
        <h2>Place your Bet:</h2>
        <button onClick={() => handleBet(1)}>$1</button>
        <button onClick={() => handleBet(5)}>$5</button>
        <button onClick={() => handleBet(10)}>$10</button>
        <p>Total Bet: ${betAmount}</p>
      </div>



      
      {errorMessage && <p >{errorMessage}</p>}
      {winMessage && <p>{winMessage}</p>}




      <div>
        <button onClick={handleWinnerCheck}>PLAY</button>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};


export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/winner');
  const data = await response.json();

  // Return the fetched data as props to the Home component
  return {
    props: {
      lottowinners: data.LottoNumber || [], // If no data is returned, pass an empty array
    },
  };
}

export default Home;