type RoomButtonProps = {
  textButton: string;
  onClick: () => void;
}

function RoomButton({textButton, onClick} : RoomButtonProps) {
  return (
    <button
      className="w-full bg-primary text-white py-3 rounded-lg font-medium text-lg" onClick={onClick}
    >
      {textButton}
    </button>
  )
}

export default RoomButton