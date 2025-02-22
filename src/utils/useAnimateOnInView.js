import { useEffect } from 'react';

const { useAnimation } = require('framer-motion');
const { useInView } = require('react-intersection-observer');

const useAnimateOnInView = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls };
};

export default useAnimateOnInView;
