import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cartImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function App() {
  const [cards, setCards] = useState([]); // Belirli bir oyun için kartlarımızı saklayacak bir durum. Başlangıç durumu boş bir dizi
  const [turns, setTurns] = useState(0); //oyunu tamamlamak için kaç kere cartları döndürdüğü durum . Başlangıç durumu 0
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled,setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cartImages, ...cartImages] // 12 adet cart var
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards); // karışmış kartlar
    setTurns(0);
  };
  // eğer choiceOne null ise setChoiceOne a yeni seçilen değer atanır.null değilse yani seçilmiş ise setChoiceTwo
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
   
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          //karıştırılmış olan tüm kartlar false durumunda dizinin içindedir.
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(()=>resetTurn() , 1000)
        
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1); // kaç kere kartlerin döndüğünü hesaplar
    setDisabled(false)
  };

  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Magic match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched }
          disabled={disabled} />
        ))}
      </div>
      <p> Turns : {turns}</p>
    </div>
  );
}

export default App;
