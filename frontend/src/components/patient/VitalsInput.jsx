const VitalsInput = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Vitals Input</h3>
      <form>
        <input type="number" placeholder="Blood Pressure" />
        <input type="number" placeholder="Heart Rate" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VitalsInput;