<div align="center">
  <h1 align="center">Share Space</h1>
  
  ![version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)

  <p align="center">
    React.js + TypeScript + Vite
    <br>
    <h3 align="center">쉐어스페이스는 좁은 주거 공간, 계절 용품의 보관 문제, 취미 장비 관리 등</h3>
    <h3 align="center">공간 부족 문제를 해결해 줄 수 있는 이웃 간의 공간 공유 플랫폼입니다.</h3>
  </p>
</div>

## 바로가기

- [사용버전](#사용버전)
- [설치 및 실행방법](#설치및실행방법)
- [프로젝트 구조](#프로젝트구조)

## Start

## 사용버전

```sh
npm -v
# 10.7.0

node -v
# v22.1.0
```

## 설치 및 실행
```sh
git clone # 클론

npm install # 해주세요

npm run dev # 실행
```

## 프로젝트 구조
```text
> src
    > guest                # Guest 관련 폴더
    > host                 # Host 관련 폴더
    > api                  # api 핸들러 함수 폴더
    > component            # 반복적으로 쓰이는 컴포넌트 폴더
    > hooks                # 커스텀 훅 폴더
    > interface            # 반복적으로 사용되는 인터페이스 폴더
    > layout               # 반복적으로 쓰이는 레이아웃 폴더
    > pages                # 화면별 폴더
    > utils                # 공통적으로 쓰이는 함수 모음 유틸 폴더       
       
