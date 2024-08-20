const Propagation = () => {
  const handleParent = () => alert("parent");
  const handleChild = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    alert("child");
  };
  return (
    <div onClick={handleParent}>
      <button onClick={handleChild}>Child</button>
    </div>
  );
};

export default Propagation;
