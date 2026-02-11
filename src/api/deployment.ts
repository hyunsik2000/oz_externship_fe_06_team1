import { apiClient } from '@/api/instance'
import { API_PATHS } from '@/constants/api'
import type {
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

  updateStatus: (id: number, is_active: boolean) =>
    apiClient.patch(API_PATHS.DEPLOYMENT.STATUS(id), { is_active }),

  delete: (id: number) => apiClient.delete(API_PATHS.DEPLOYMENT.DETAIL(id)),
}
