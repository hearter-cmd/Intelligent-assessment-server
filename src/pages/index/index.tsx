import {View, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import Taro from "@tarojs/taro";

import './index.scss'

import IndexBg from "../../assets/index/index-background.jpg";
import GlobalFooter from "../../components/GlobalFooter";



/**
 * 首页
 */
export default () => {
  return (
    <View className='indexPage'>
      <View className='at-article__h1 title'>MBTI 性格测试</View><br />
      <View className='at-article__h2 subTitle'>只需要 2 分钟, 就能非常精准的描述出你的性格特点</View>
      <AtButton
        circle
        type='primary'
        className='enterBtn'
        onClick={() => {
          Taro.navigateTo({url: '/pages/doQuestion/index'})
        }}
      >
        开始测试
      </AtButton>
      <Image
        className='at-article__img indexBg'
        src={IndexBg} // 背景图
      />
      <GlobalFooter />
    </View>

  )
}
