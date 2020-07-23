import React from 'react';
// Redux
import { useSelector } from 'react-redux';
// Router
import { useHistory } from 'react-router-dom';
// Components
import WordCarousel from '../UI/CustomUI/WordCarousel/WordCarousel';
import { ScCard, ScHeader, ScButton } from '../../component/UI/Styled';
// CSS
import styled from 'styled-components';
// Misc.
import shoppingVideo from '../../images/shopping.mp4';

const StyledContainer = styled.section`
  margin-top: -5rem;
  margin-bottom: -5rem;
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.bp.phone} {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    padding: 0 0.5rem;
  }
`;

const VideoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: linear-gradient(
    to bottom right,
    rgba(0, 109, 179, 0.8),
    rgba(99, 204, 255, 0.8)
  );
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.05;
`;

const WORD_ARRAY = ['Get What You Need Today', 'And Pay Later'];

const Home = (props) => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <StyledContainer>
      <VideoContainer>
        <Video autoPlay muted loop>
          <source src={shoppingVideo} type="video/mp4" />
          Your browser is not supported
        </Video>
      </VideoContainer>
      <ScCard padding="4rem" width={45} shadow="SmoothXs" colorGrade="light" bgColor="grey1">
        <div>
          <ScHeader as="h1" fontSize={3} fontWeight={700} color="secondary">
            Shop Now. Pay Later.
          </ScHeader>

          <ScHeader as="h1" fontSize={3} fontWeight={700} color="secondary"></ScHeader>
          <WordCarousel wordArray={WORD_ARRAY} />
          <ScButton
            variant="secondary"
            onClick={() => {
              history.push({ pathname: `${isAuthenticated ? '/personalinfo' : '/signup'}` });
            }}
          >
            APPLY NOW
          </ScButton>
        </div>
      </ScCard>
    </StyledContainer>
  );
};

export default Home;
