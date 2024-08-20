const Form = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(typeof event);
    event.preventDefault();
    const text = event.target.elements.user.value;
    alert(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user" />
      <button>Submit</button>
    </form>
  );
};

export default Form;
