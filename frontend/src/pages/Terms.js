import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TermsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
`;

const TermsTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  color: var(--accent-primary);
  &:hover {
    text-decoration: underline;
  }
`;

const Terms = () => {
  return (
    <TermsContainer>
      <TermsTitle>利用規約</TermsTitle>
      <Section>
        <strong>第1条（適用）</strong><br />
        本利用規約（以下、「本規約」といいます。）は、本サービスの利用条件を定めるものです。ユーザーは、本規約に同意の上、本サービスを利用するものとします。
      </Section>
      <Section>
        <strong>第2条（定義）</strong><br />
        「本サービス」とは、ユーザーがイベントを開催し、またはイベントに参加する意思を示すことができるウェブサービスを指します。<br />
        「ユーザー」とは、本サービスに登録し、本規約に同意の上、本サービスを利用する個人または法人を指します。<br />
        「主催者」とは、本サービスを利用してイベントを開催するユーザーを指します。<br />
        「参加者」とは、本サービスを利用してイベントへの参加を表明するユーザーを指します。
      </Section>
      <Section>
        <strong>第3条（登録）</strong><br />
        ユーザーは、本サービスを利用するために、ユーザー名およびパスワードを登録するものとします。<br />
        登録の際、虚偽の情報を提供してはなりません。<br />
        登録情報に変更があった場合、ユーザーは速やかに変更手続きを行うものとします。
      </Section>
      <Section>
        <strong>第4条（アカウント管理）</strong><br />
        ユーザーは、自己の責任においてアカウント情報（ユーザー名・パスワード）を管理しなければなりません。<br />
        ユーザーの過失によるアカウントの不正利用について、当サービスは一切の責任を負いません。
      </Section>
      <Section>
        <strong>第5条（禁止事項）</strong><br />
        ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。<br />
        ・法令または公序良俗に違反する行為<br />
        ・他のユーザーまたは第三者に対する誹謗中傷、脅迫、嫌がらせ<br />
        ・本サービスの運営を妨害する行為<br />
        ・虚偽の情報を登録する行為<br />
        ・その他、当サービスが不適切と判断する行為
      </Section>
      <Section>
        <strong>第6条（イベントの開催と参加）</strong><br />
        主催者は、イベントの詳細情報を正確に記載しなければなりません。<br />
        参加者は、イベントへの参加表明を行った後、キャンセルが必要な場合は速やかに対応するものとします。<br />
        イベント内でのトラブルについて、当サービスは一切の責任を負いません。
      </Section>
      <Section>
        <strong>第7条（免責事項）</strong><br />
        本サービスは、ユーザーによるイベント開催および参加に関して、一切の責任を負いません。<br />
        ユーザー間のトラブルについて、当サービスは関与せず、責任も負いません。<br />
        サービスの変更・停止・終了により発生した損害について、当サービスは一切の責任を負いません。
      </Section>
      <Section>
        <strong>第8条（規約の変更）</strong><br />
        当サービスは、必要に応じて本規約を変更できるものとします。変更後の規約は、本サービス上に掲載した時点で効力を持つものとします。
      </Section>
      <Section>
        <strong>第9条（準拠法および管轄）</strong><br />
        本規約の解釈にあたっては、日本法を準拠法とします。<br />
        本サービスに関する紛争については、当サービスの運営者の所在地を管轄する裁判所を専属的合意管轄とします。
      </Section>
      <BackLink to="/">← ホームに戻る</BackLink>
    </TermsContainer>
  );
};

export default Terms; 