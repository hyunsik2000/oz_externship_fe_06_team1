/// <reference types="vite/client" />

declare module '*.svg?react' {
  import * as React from 'react'
  const ReactComponent: React.FC<React.SBGProps<SBGSVGElement>>
  export default ReactComponent
}
