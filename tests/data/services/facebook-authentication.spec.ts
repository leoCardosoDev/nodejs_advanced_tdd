import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (private readonly loadUserFacebookApi: LoadFacebookUserApi) {}
  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadUserFacebookApi.loadUser(params)
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser (params: LoadFacebookUserApi.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAutehnticationService', () => {
  it('Should call LoadFacebookUserApi with correct params', async () => {
    const loadUserFacebookApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadUserFacebookApi)
    await sut.perform({ token: 'any_token' })
    expect(loadUserFacebookApi.token).toBe('any_token')
  })
})
