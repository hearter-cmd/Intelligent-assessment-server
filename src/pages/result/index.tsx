// Taro组件导入
import {View, Image} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import Taro from "@tarojs/taro";
// 样式导入
import './index.scss'
// 组件导入
import IndexBg from "../../assets/index/index-background.jpg";
import GlobalFooter from "../../components/GlobalFooter";
// 数据导入
import questions from '../../data/question.json'
import questionResult from '../../data/question_results.json';
// 外部函数导入
import {getBestQuestionResult} from '../../utils/bizUtils';




/**
 * 首页
 */
export default () => {
  // 获取答案列表
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: '答案为空',
      icon: 'error',
      duration: 2000
    })
  }
  // 获取最佳答案
  const result = getBestQuestionResult(answerList, questions, questionResult);

  return (
    <View className='resultPage'>
      <View className='at-article__h1 title'>{ result.resultName }</View><br />
      <View className='at-article__h2 subTitle'>{ result.resultDesc }</View>
      <AtButton
        circle
        type='primary'
        className='enterBtn'
        onClick={() => {
          Taro.navigateTo({url: '/pages/index/index'})
        }}
      >
        返回主页
      </AtButton>
      <Image
        className='at-article__img indexBg'
        src={IndexBg} // 背景图
      />
      <GlobalFooter />
    </View>

  )
}
