interface AlertProps {
  onAlert: () => void;
}

const Alert = ({ onAlert }: AlertProps) => {
  return <button onClick={onAlert}>Click</button>;
};

export default Alert;
