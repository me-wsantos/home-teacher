"use client"

interface IProps {
  key: number
  title: string;
  channel: string;
  visualizations: number;
  publish: string;
  url: string;
}

export function CardVideo({ key, title, channel, visualizations, publish, url }: IProps) {
  return (
    <div key={key} className="flex flex-col items-start p-4 border rounded-lg shadow-md bg-white w-[80%] max-w-sm mt-4">
      <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={`/images/youtube-thumb.png`}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      </a>
      <div className="mt-4">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-blue-600 hover:underline">
          {title}
        </a>
        <p className="text-sm text-gray-500 mt-1">{channel}</p>
        <p className="text-sm text-gray-500 mt-1">
          {visualizations.toLocaleString('pt-BR')} visualizações • {new Date(publish).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
