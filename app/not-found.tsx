'use client';

import Snowfall from 'react-snowfall';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-full w-full">
      <Snowfall snowflakeCount={100}></Snowfall>
    </div>
  );
}
