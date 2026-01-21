import VectorIcon from '../../assets/Vector.svg'

export default function AdminHeader() {
  return (
    <header className="bg-primary-50 border-grey-300 flex h-16 w-full items-center justify-end border-b px-6">
      <div className="text-grey-800 flex items-center gap-2 text-sm">
        <div className="relative h-6 w-6">
          <img src={VectorIcon} className="h-6 w-6" alt="" aria-hidden="true" />
        </div>
        <span>Admin 님</span>
        {/* 추후 (로그인 된 유저명)+'님' 으로 수정 예정 */}
      </div>
    </header>
  )
}
