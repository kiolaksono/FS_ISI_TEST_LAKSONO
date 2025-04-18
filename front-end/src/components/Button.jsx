export default function Button({ name }) {
    return (
      <button
        className={`text-black font-medium py-2 px-4 rounded-xl my-5 ${
          name === 'Update Task'
            ? 'bg-orange-400'
            : name === 'Cancel'
            ? 'bg-red-400'
            : 'bg-blue-300'
        }`}
      >
        {name}
      </button>
    );
  }
  