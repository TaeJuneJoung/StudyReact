const List = () => {
  const items: string[] = ["Date plan", "Apple", "Banana", "Cherry"];
  return (
    <ul>
      {items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default List;
