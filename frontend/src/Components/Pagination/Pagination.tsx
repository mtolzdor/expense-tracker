type Props = {
  onNext: () => void;
  onPrev: () => void;
};

export default function Pagination({ onNext, onPrev }: Props) {
  return (
    <div className="pagination-container">
      <button onClick={onPrev}>Prev</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
}
