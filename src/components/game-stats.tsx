interface GameStatsProps {
  gameTime: number;
  moveCount: number;
  hintsUsed: number;
  completion: number;
}

export default function GameStats({ gameTime, moveCount, hintsUsed, completion }: GameStatsProps) {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Game Stats</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Time</span>
          <span className="font-semibold text-blue-600">{formatTime(gameTime)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Moves</span>
          <span className="font-semibold">{moveCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Hints Used</span>
          <span className="font-semibold">{hintsUsed}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Completion</span>
          <span className="font-semibold text-green-600">{completion}%</span>
        </div>
      </div>
    </div>
  );
}
