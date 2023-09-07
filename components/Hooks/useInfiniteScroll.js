import { useState, useEffect } from 'react';
import _debounce from 'lodash/debounce';

const useInfiniteScroll = (updatePosts, distanceToBottom) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = async () => { 
    if (isLoading) return;

    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    if (totalHeight - (scrollY + windowHeight) < distanceToBottom) {
      setIsLoading(true);
      try {
        await updatePosts(); // 使用 await 等待 updatePosts 完成
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching posts:', error);
      }
    }
  };

  const debouncedHandleScroll = _debounce(handleScroll, 500);
  useEffect(() => {
    if (updatePosts !== null) {
      window.addEventListener('scroll', debouncedHandleScroll);
      return () => {
        window.removeEventListener('scroll', debouncedHandleScroll);
      };
    }
  }, [updatePosts, distanceToBottom]);
};

export default useInfiniteScroll;