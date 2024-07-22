import Image from "next/image";
import React from "react";
import Link from "next/link";

const AboutLayer = () => {
    return (
        <div className="layer__contents">
            <div className="layer__bg"></div>
            <div className="flex items-center head">
                <div className="me w-[11.25rem]">
                    <Image src="/assets/img/nib.jpg" alt="" width={180} height={240} className="rounded-md " />
                </div>
                <div className="ml-4 name h-60">
                    <h3 className="text-[1.563rem] mb-[0.313rem]">김진우</h3>
                    <span className="text-base">FullStack developer</span>
                    <Link
                        href="mailto:kjw040416@gmail.com"
                        className="block text-[0.75rem] mt-[1.875rem] relative before:content-[''] before:w-12 before:h-[1px] before:bg-white before:absolute before:left-0 before:-top-4"
                    >
                        kjw040416@naver.com
                    </Link>
                </div>
            </div>
            <p className="mt-[1.875rem] text-lg leading-normal intro1">
                안녕하세요! 사용자 중심의 코딩과 다양한 최신 기술에 열정을 가진 취업 준비생입니다.
                <br />
                C, Python, React 를 포함한 다양한 언어에 능숙하며,사용자 경험을 최우선으로 생각하는 웹사이트와 프로그램 개발에 경험이 있습니다. 새로운 것을 배우고 도전하는 것을 좋아하며, 팀과 협력하여
                혁신적이고 효과적인 솔루션을 만드는 데 기여하고 싶습니다.
            </p>
            <p className="mt-5 text-[0.813rem] intro2 opacity-80">
                저는 21살 김진우입니다. 특성화고 컴퓨터과를 졸업했습니다. 어릴 적부터 코딩에 열정이 있어 초등학교 때 C언어를 독학으로 시작했습니다. 중학교와 고등학교 동안 다양한 대회와 프로젝트에
                참여하며 팀워크와 문제 해결 능력을 키웠고, 대회에서 상도 받으며 실력을 인정받았습니다. 군 복무 중에도 코딩 공부를 계속하며 다양한 프로젝트를 진행했습니다.전역 후 최신 기술 트렌드와
                개발 방법론을 학습하며 역량을 키웠습니다. 개발 회사에서 제가 만든 프로그램이 많은 사람들에게 유용하게 쓰이는 것을 꿈꾸고 있습니다. 감사합니다.
            </p>
            <div className="mt-[3.125rem] flex justify-between">
                <dl className="w-[48.5%]">
                    <dt className="mb-[0.625rem] py-[0.313rem]" style={{ borderBottom: "1px solid #fff" }}>
                        Frontend
                    </dt>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            HTML/CSS
                        </em>
                        : 웹 페이지의 구조와 시각적 디자인을 효과적으로 구현할 수 있습니다. 다양한 HTML5 태그와 CSS3를 활용하여 반응형 웹사이트를 개발하는 데 익숙합니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            JavaScript
                        </em>
                        : 동적 웹 페이지 및 애플리케이션 개발에 능숙하며, 비동기 프로그래밍, ES6+ 문법, DOM 조작에 익숙합니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            React
                        </em>
                        : 컴포넌트 기반 아키텍처를 이해하고 있으며, React Hooks와 상태 관리 라이브러리(예: Redux)를 활용한 경험이 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            Vue
                        </em>
                        : 선언적 렌더링과 컴포넌트 시스템을 이용한 인터랙티브한 UI 개발에 익숙하며, Vuex를 활용한 상태 관리와 Vue Router를 사용한 라우팅 경험이 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            Next.js
                        </em>
                        : 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 이해하고 있으며, SEO 최적화 및 퍼포먼스 향상을 위한 전략을 구현할 수 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            PHP
                        </em>
                        : 서버 사이드 스크립트 작성과 동적 웹 페이지 생성에 능숙하며, 객체지향 PHP 개발과 MVC 아키텍처 적용 경험이 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            TypeScript
                        </em>
                        : 정적 타입 체크와 객체 지향 프로그래밍을 통해 더 안전하고 유지보수 가능한 코드를 작성할 수 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            Tailwind
                        </em>
                        : 유틸리티 우선 CSS 프레임워크를 사용하여 효율적이고 일관된 스타일링을 구현할 수 있습니다.
                    </dd>
                </dl>

                <dl className="w-[48.5%]">
                    <dt className="mb-[0.625rem] py-[0.313rem]" style={{ borderBottom: "1px solid #fff" }}>
                        Backend
                    </dt>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            Python
                        </em>
                        : 다양한 웹 프레임워크를 활용한 백엔드 개발 경험이 있으며, 데이터 분석과 자동화 스크립팅에 능숙합니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            C
                        </em>
                        : 시스템 프로그래밍과 성능 최적화에 관심이 있으며, 다양한 프로젝트에서 활용해 본 경험이 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            Network
                        </em>
                        : 네트워크 프로토콜과 보안, 서버 설정 및 관리에 대한 기초적인 지식을 보유하고 있습니다.
                    </dd>
                    <dd className="py-[1px] text-sm text-justify mb-[0.625rem]" style={{ textTransform: "uppercase" }}>
                        <em className="mb-1 underline" style={{ textUnderlinePosition: "under" }}>
                            Database
                        </em>
                        : 관계형 데이터베이스와 NoSQL 데이터베이스 설계, 최적화, 복잡한 쿼리 작성에 능숙합니다.
                    </dd>
                </dl>
            </div>
        </div>
    );
};

export default AboutLayer;
