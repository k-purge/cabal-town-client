import { Box, Fade } from "@mui/material";
import { Screen, ScreenContent } from "components/Screen";
import { StyledWrapper, StyledHeading, StyledTitle, StyledParagraph } from "./styles";

const faq = [
  {
    question: "What is Purge.fun?",
    answer: `<b>Purge.fun</b> is a social survival game that rewards the most loyal and purges the rest. The app combines crypto, social interaction, and gamified elements to create a fun and rewarding experience.`,
  },
  {
    question: "How do I start?",
    answer: `<b>You can start</b> by buying a token on the bonding curve to participate in the game. Upon purchasing the buy-in amount, you will be invited to join a private group.`,
  },
  {
    question: "How does the game work?",
    answer: `<b>Before the game:</b> Purchase a token on the bonding curve to participate in the game.
</br><b>Game ON:</b> When the token reaches 42K USD market cap, the game is created and all token holders will be invited to join a private group. The game consists of 10 rounds, each lasting 69 hours. At the end of each round, THE PURGE takes place.
</br><b>Game ends</b>: Winner winner chicken dinner! The remain participants can claim their winner rewards.`,
  },
  {
    question: "What is THE PURGE?",
    answer: `<b>After each round,</b> a percentage of users with the least amount of tokens will be removed from the group. The exact percentage is determined by an algorithm that depends on the number of rounds remaining, the number of game participants, and the winner size pre-determined when setting up the game.`,
  },
  {
    question: "What is the buy-in amount?",
    answer: `<b>Buy-in amount</b> refers to the minimum amount for you to enter the game. For games that haven't started yet, the buy-in will be 1 token. Whereas for games that have started, the buy-in will equal the least amount of tokens the in-game participants have.`,
  },
  {
    question: "What is the reward for the final winners?",
    answer: `<b>On top of</b> being part of a close community, you will also earn 25% of the fees generated via trading the token.`,
  },
  {
    question: "What happens at the end of the game?",
    answer: `<b>At the end of the game,</b> the number of participants in the private group stabilizes. However, when new participants join the group, the person with the least amount of tokens will still be removed.`,
  },
];

function FaqPage() {
  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            <StyledHeading>HOW IT WORKS</StyledHeading>
            <StyledWrapper>
              {faq.map(({ question, answer }) => (
                <>
                  <StyledTitle>{question}</StyledTitle>
                  <StyledParagraph dangerouslySetInnerHTML={{ __html: answer }} />
                </>
              ))}
            </StyledWrapper>
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { FaqPage };
