import useKeydown from "../lib/useKeydown";
import useBoundedCounter from "../lib/useBoundedCounter";
import useSwipe from "../lib/useSwipe";
import { Direction } from "../lib/useSwipe/Direction";

const background = "#fef6e4";
const stroke = "#001858";

const PHOTO_COUNT = 57;

const Home = ({ initialIndex }) => {
  const [index, incIndex, decIndex] = useBoundedCounter(
    [0, PHOTO_COUNT],
    initialIndex,
  );

  useKeydown({
    ArrowLeft: decIndex,
    ArrowRight: incIndex,
  });

  useSwipe({
    [Direction.Left]: decIndex,
    [Direction.Right]: incIndex,
  });

  return (
    <div>
      <img
        src={`https://s3.amazonaws.com/engagement.james-siegel.com/${index}.jpg`}
      />

      <style jsx>{`
        div {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: ${background};
          background-image: url("/ring.png");
          background-repeat: space;
          background-size: 10vw;
        }

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          display: block;
          margin: 0;
          padding: 0;
          max-width: 75vw;
          max-height: 75vh;
          transform: translate(-50%, -50%);
          border: 10px solid ${stroke};
          border-radius: 10px;
          background-color: ${stroke};
        }
      `}</style>
    </div>
  );
};

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

Home.getInitialProps = () =>
  Promise.resolve({ initialIndex: randomNumber(0, PHOTO_COUNT) });

export default Home;
