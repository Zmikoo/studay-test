import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// 用户查询
export function getUserMsg(leaderPage,params) {
  if (leaderPage) {   
    return request({
      url:'/user/leaderInfo',
      method:'post',
      data:params
    })
  } else {   
    return request({
      url:'/user/userInfo',
      method:'post',
      data:params
    })
  }
}

// 员工工位关联
export function createConnect(params) {
  return request({
    url:'/userProce/association',
    method:'post',
    data:params
  })
}

export function delConnect(params) {
  return request({
    url:'/userProce/deleteAssociation',
    method:'post',
    data:params
  })
}


export function changeConnect(params) {
  return request({
    url:'/process/selectProduce',
    method:'post',
    data:params
  })
}

// 资源管理
export function getResource(params) {
  return request({
    url:'/process/getProcessModelInfoList',
    method:'post',
    data:params
  })
}

export function delResource(params) {
  return request({
    url:'/process/deleteProcessResource',
    method:'post',
    data:params
  })
}

// 管理员账号管理
export function createManagerAccount(params) {
  return request({
    url:'/user/insert',
    method:'post',
    data:params
  })
}

export function delManagerAccount(params) {
  return request({
    url:'/user/delete',
    method:'post',
    data:params
  })
}

export function updateManagerData(data) {
  return request({
    url:'/user/update',
    method:'post',
    data
  })
}

export function getManagerList(params) {
  return request({
    url:'/user/administratorsInfo',
    method:'post',
    data:params
  })
}


// 账号设置
export function accountSet(params) {
  return request({
    url:'/user/accountSettings',
    method:'post',
    data:params
  })
}
