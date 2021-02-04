import mockjs from "mockjs";
import Mock from 'mockjs'
import salt from './login/salt'

console.log('This is mock file')
// 获取盐值
Mock.mock(RegExp('/login/salt' + '.*'), 'get', options => {
  return salt
})