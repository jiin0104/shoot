# 🎮 ShootingGame
#### 내려오는 적군을 물리치는 간단한 슈팅게임
<img width="250" alt="image" src="https://github.com/jiin0104/shoot/assets/122608411/ecba277e-8699-4a4c-b2a8-ef356eb58189">
<br>
<br>
<br>

## 목차
1. [개요](#개요)
2. [개발환경](#개발환경)
3. [설계](#설계)
4. [시연](#시연)
5. [실행](#실행)
<br>
<br>


## 개요
* 프로젝트 이름: Shooting Game
* 기간: 1일
* 인원: 1명
* 목적: Javascript 강의를 통해 간단한 슈팅게임을 제작하였습니다.
  * 방향키로 내 우주선의 위치를 변화시키고
  * 적군을 1초마다 내려오게 하며
  * 내가 쏜 총알이 적군에 맞았을때 스코어의 점수를 높이고
  * 적군이 땅에 닿으면 gameover 시켰습니다.
<br>
<br>
<br>


## 개발환경
<div><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"></div> 
<br>
<br>
<br>


## 설계
* 총알들을 저장하는 bulletList를 만들고 위치를 내 우주선의 x,y값으로 초기화시키기
* for문을 이용해 적군의 리스트 (enemyList)를 가져오기
* 총알의 y값이 적군의 y값보다 작거나 && 총알의 x값이 적군의 x값보다 크거나 && 적군의 x값보다 작으면 스코어 증가, 총알의 상태 false로 바꾸기, enemyList의 i번째에 있는 값 하나를 삭제시킴 
* 적군의 위치를 init으로 초기화 시키고 최대값, 최소값 지정
* 적군의 y값이 캔버스내에서 내 우주선의 y값(60)을 뺀 값보다 커지면 gameOver함수를 true로 변경, render를 하지 않고 gameOverImage를 띄워준다
<br>
<br>
<br>


## 시연
<img width="250" alt="image" src="https://github.com/jiin0104/shoot/assets/122608411/d8e67886-9d4d-4d6f-a3c9-7922de3d7354">
<br>
<br>



## 실행

    cd index.html
    openliveserver


