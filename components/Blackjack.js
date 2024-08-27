// components/Blackjack.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const getCardValue = (card) => {
  if (['J', 'Q', 'K'].includes(card)) return 10;
  if (card === 'A') return 11;
  return card;
};

const calculateHandValue = (hand) => {
  let value = hand.reduce((acc, card) => acc + getCardValue(card), 0);
  let aceCount = hand.filter((card) => card === 'A').length;

  // Adjust for Aces
  while (value > 21 && aceCount > 0) {
    value -= 10;
    aceCount -= 1;
  }

  return value;
};

const getRandomCard = () => {
  const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};

const Blackjack = () => {
  const [playerHand, setPlayerHand] = useState([getRandomCard(), getRandomCard()]);
  const [dealerHand, setDealerHand] = useState([getRandomCard(), getRandomCard()]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const hit = () => {
    const newCard = getRandomCard();
    const newPlayerHand = [...playerHand, newCard];
    setPlayerHand(newPlayerHand);

    const playerValue = calculateHandValue(newPlayerHand);
    if (playerValue > 21) {
      setIsGameOver(true);
      setMessage('Bust! You lose.');
    }
  };

  const stand = () => {
    let newDealerHand = [...dealerHand];
    while (calculateHandValue(newDealerHand) < 17) {
      newDealerHand.push(getRandomCard());
    }
    setDealerHand(newDealerHand);

    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(newDealerHand);

    if (dealerValue > 21 || playerValue > dealerValue) {
      setMessage('You win!');
    } else if (playerValue === dealerValue) {
      setMessage('It\'s a tie!');
    } else {
      setMessage('Dealer wins!');
    }

    setIsGameOver(true);
  };

  const resetGame = () => {
    setPlayerHand([getRandomCard(), getRandomCard()]);
    setDealerHand([getRandomCard(), getRandomCard()]);
    setIsGameOver(false);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blackjack</Text>
      <Text>Player Hand: {playerHand.join(' ')}</Text>
      <Text>Dealer Hand: {isGameOver ? dealerHand.join(' ') : dealerHand[0] + ' ?'}</Text>
      <Text>{message}</Text>
      {!isGameOver ? (
        <View>
          <Button title="Hit" onPress={hit} />
          <Button title="Stand" onPress={stand} />
        </View>
      ) : (
        <Button title="Play Again" onPress={resetGame} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Blackjack;
