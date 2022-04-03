import { DotsVerticalIcon, AnnotationIcon } from '@heroicons/react/solid';

export default function Sidebar() {
  return (
    <div>
      <header className="flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://avatars.githubusercontent.com/u/48112040?s=96&v=4"
          alt="Profile Picture"
          className="h-16 w-16 rounded-full border-[2px]"
        />
        <div className="flex items-center justify-end space-x-4">
          <AnnotationIcon className="sbBtn" />
          <DotsVerticalIcon className="sbBtn" />
        </div>
      </header>
    </div>
  );
}
