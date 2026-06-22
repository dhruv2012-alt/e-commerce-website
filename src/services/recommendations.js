export const getRecommendations = (userHistory, allProducts) => {
  const lastCategory = userHistory.slice(-1)[0]?.category;
  return allProducts
    .filter((p) => p.category === lastCategory && !userHistory.some(u => u.id === p.id))
    .slice(0, 5);
};