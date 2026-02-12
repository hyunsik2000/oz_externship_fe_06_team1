import { apiClient } from '@/api/instance'
import { API_PATHS } from '@/constants/api'
import type {
  ExamDeploymentDetailType,
  ExamDeploymentItemType,
  PaginatedDeploymentResponse,
} from '@/types'

export const deploymentApi = {
  getList: (params: {
    page?: number
    search?: string
    course?: string
    cohort?: string
  }) =>
    apiClient.get<PaginatedDeploymentResponse<ExamDeploymentItemType>>(
      API_PATHS.DEPLOYMENT.LIST,
      { params }
    ),

  getDetail: (id: number | string) =>
    apiClient.get<ExamDeploymentDetailType>(API_PATHS.DEPLOYMENT.DETAIL(id)),

  updateStatus: (id: number, status: string) =>
    apiClient.patch(API_PATHS.DEPLOYMENT.STATUS(id), { status }),

  delete: (id: number) => apiClient.delete(API_PATHS.DEPLOYMENT.DETAIL(id)),
}
