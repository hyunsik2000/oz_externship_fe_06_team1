import { useState } from 'react'
import { AdminContainer } from '@/components/layout/AdminContainer'
import DeploymentToggle from '@/components/common/DeploymentToggle'
import {
  examDeploymentHistoryMock,
  type ExamDeploymentRow,
} from '@/mocks/table-data/ExamDeploymentHistory'

export default function ExamDeploymentHistoryPage() {
  const [rows, setRows] = useState<ExamDeploymentRow[]>(
    examDeploymentHistoryMock
  )

  const handleToggle = (id: number, value: boolean) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, active: value } : row))
    )
  }

  return (
    <AdminContainer title="쪽지시험 배포 내역 조회">
      <div className="rounded-sm border border-[#DDDDDD] bg-white">
        <div className="px-6 pt-4 pb-5">
          {/* 검색 영역 */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                className="h-10 w-[260px] rounded-md border border-[#E5E5EC] px-4 text-sm"
                placeholder="검색어를 입력하세요."
              />
              <button className="h-10 w-[72px] rounded-md bg-[#E5E5EC] text-sm text-[#6B6B80]">
                조회
              </button>
            </div>

            <button className="flex h-10 items-center gap-2 rounded-md bg-[#F3F0FF] px-4 text-sm text-[#6C5DD3]">
              🔍 과목별 필터링
            </button>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] text-sm">
              <thead>
                <tr className="bg-[#F7F7F7]">
                  {[
                    'ID',
                    '제목',
                    '과목명',
                    '과정 / 기수',
                    '응시 수',
                    '평균',
                    '배포 생성 일시',
                    '배포 활성 상태',
                  ].map((h) => (
                    <th
                      key={h}
                      className="h-[50px] border-b border-[#DDDDDD] px-2 text-center font-normal text-[#6B6B80]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="h-[54px] border-b border-[#EEEEEE]"
                  >
                    <td className="px-2 text-center">{row.id}</td>
                    <td className="px-2 text-left text-[#6B6B80] underline">
                      {row.title}
                    </td>
                    <td className="px-2 text-center">{row.subject}</td>
                    <td className="px-2 text-center">{row.course}</td>
                    <td className="px-2 text-center">{row.count}</td>
                    <td className="px-2 text-center">{row.avg}</td>
                    <td className="px-2 text-center">{row.createdAt}</td>
                    <td className="px-2 text-center">
                      <DeploymentToggle
                        checked={row.active}
                        onChange={(v) => handleToggle(row.id, v)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          <div className="mt-3 flex justify-center text-sm">« 1 2 3 4 5 »</div>
        </div>
      </div>
    </AdminContainer>
  )
}
