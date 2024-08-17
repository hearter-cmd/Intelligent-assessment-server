import {useEffect, useState} from 'react';
import {View,} from '@tarojs/components';
import {AtButton, AtRadio} from 'taro-ui';
import Taro from "@tarojs/taro";

import './index.scss';


import GlobalFooter from "../../components/GlobalFooter";
import questions from '../../data/question.json';


/**
 * @description: MBTI 测试页面
 */
export default () => {
  // 当前题号
  const [currentIndex, setIndex] = useState(0);
  // 当前问题
  const [currentQuestion, setQuestion] = useState(questions[currentIndex])
  // 当前问题的选项
  const questionOptions = currentQuestion.options.map(option => {
    return {
      label: option.key + '.' + option.value,
      value: option.key
    }
  })
  // 当前问题的答案
  const [currentAnswer, setAnswer] = useState('');
  // 回答集合
  const [answerList] = useState<string[]>([]);
  // 监控标签的修改
  useEffect(() => {
    setQuestion(questions[currentIndex])
    setAnswer(answerList[currentIndex] || '')
  }, [currentIndex]);

  return (
    <View className='doQuestionPage'>
      <View className='at-article__h2 title'>{currentIndex + 1}. {currentQuestion.title}</View>
      <View className='options-wrapper'>
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            setAnswer(value);
            answerList[currentIndex] = value;
          }
          }
        />
      </View>
      {
        currentIndex < questions.length - 1 && (
          <AtButton
            circle type='primary'
            className='controllerBtn'
            disabled={!currentAnswer}
            onClick={() => {
              setIndex(currentIndex + 1);

              console.log(currentIndex)
            }
            }
          >
            下一题
          </AtButton>)
      }
      {
        currentIndex == questions.length - 1 && (
          <AtButton
            circle
            type='primary'
            className='controllerBtn'
            onClick={() => {
              Taro.setStorage(
                {
                  key:"answerList",
                  data:answerList
                },
              )
              Taro.reLaunch({
                url: '/pages/result/index'
              })
            }}
          >
            查看结果
          </AtButton>
        )
      }
      {
        currentIndex > 0 && (
          <AtButton
            circle
            className='controllerBtn'
            onClick={() => {
              setIndex(currentIndex - 1);
              console.log(currentIndex);
            }
            }
          >
            上一题
          </AtButton>
        )
      }
      <GlobalFooter />
    </View>

  )
}
