import React, { memo, useState, useEffect, useRef } from "react";

import moment from 'moment'
import marked from "marked";
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import { getLabelInfo, addContent, updateContent, getArticleById, setArticleLabels } from "@/services/addAritcle";

import { Row, Col, Input, Button, DatePicker, message } from "antd";
import LabelSelect from "@/components/label-select";
import PictureDrawer from '@/components/picture-drawer'

import { WorkbanchWrapper } from "./style";

const { TextArea } = Input;

export default memo(function AddAritcle(props) {
  const tmpId = props.match.params.id

  const labelRef = useRef()
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("預覽內容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待編輯"); //简介的html内容
  const [releaseDate, setReleaseDate] = useState(); // 發布的日期
  const [isRelease, setIsRelease] = useState(false)
  const [labelInfo, setLabelInfo] = useState([]); // 文章类别信息
  const [selectedItems, setSelectedItems] = useState([])
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const [fileList, setFileList] = useState([]);

  // const renderer = new marked.Renderer();

  marked.setOptions({
    // renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    langPrefix: "hljs language-",
    highlight: function(code) {
      return hljs.highlightAuto(code, ["html", "javascript"]).value;
    }
  });

  useEffect(() => {
    getLabelInfo().then((res) => {
      setLabelInfo(res.data);
    });
  }, []);

  useEffect(() => {
    if(tmpId){
      setArticleId(tmpId)
      getArticleById(tmpId).then(res => {
        const { title, introduce, context, labels, releaseTime, images } = res.data
        setArticleTitle(title)
        setIntroducemd(introduce)
        setArticleContent(context)
        setReleaseDate( releaseTime && moment(releaseTime).format('YYYY-MM-DD'))
        releaseTime && setIsRelease(true)
        setSelectedItems(labels ? JSON.parse(labels).map(item => item.id): [])
        setFileList(images? JSON.parse(images).map(item => {
          const obj = {}
          obj.uid = item
          obj.name = "image.png";
          obj.status = "done";
          obj.url = item
          return obj
        }): [])

        setIntroducehtml(marked(introduce))
        setMarkdownContent(marked(context))
      })
    }
  }, [tmpId])

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const selectLabelHandler = (value) => {
    setSelectedItems(value)
  }

  const saveArticle = async () => {
    if(!selectedItems.length) return message.error('必須選擇文章標籤')
    if(!articleTitle) return message.error('文章標題不能為空')
    if(!articleContent) return message.error('文章內容不能為空')
    if(!introducemd) return message.error('簡介不能為空')
    let res;
    if(articleId === 0) {
      res = await addContent(articleTitle, introducemd, articleContent)
    } else {
      res = await updateContent(articleId, articleTitle, introducemd, articleContent)
    }
    const { isSuccess } = res
    if(!isSuccess) return message.error('文章保存失敗')
    setArticleId(res.insertId)
    await setArticleLabels(res.insertId, selectedItems)
    message.success('文章保存成功')
  }

  const releaseAritcle = async () => {
    if(!selectedItems.length) return message.error('必須選擇文章標籤')
    if(!articleTitle) return message.error('文章標題不能為空')
    if(!articleContent) return message.error('文章內容不能為空')
    if(!introducemd) return message.error('簡介不能為空')
    if(!releaseDate) return message.error('發布日期不能為空')
    let res;
    if(articleId === 0) {
      res = await addContent(articleTitle, introducemd, articleContent, releaseDate)
    } else {
      res = await updateContent(articleId, articleTitle, introducemd, articleContent, releaseDate)
    }
    const { isSuccess } = res
    if(!isSuccess) return message.error('文章發布失敗')
    setArticleId(res.insertId)
    await setArticleLabels(res.insertId, selectedItems)
    message.success('文章發布成功')
  }

  const disabledDate = (current) => { return current < moment().startOf('day') }

  const showDrawer = () => {
    if(!articleId) return message.error('請先保存文章')
    setIsDrawerShow(true);
  };

//   const MARKDOWN_TEXT = `React + marked + highlight.js

// **Code Sample:**
// \`\`\`javascript
// import marked from "marked";

// marked.setOptions({
//   langPrefix: "hljs language-",
//   highlight: function(code) {
//     return require("highlight.js").highlightAuto(code, ["html", "javascript"])
//       .value;
//   }
// });
// \`\`\`
// `;

// marked.setOptions({
//   langPrefix: "hljs language-",
//   highlight: function(code) {
//     return hljs.highlightAuto(code, ["html", "javascript"]).value;
//   }
// });

  return (
    <WorkbanchWrapper>
      <Row gutter={5}>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={16}>
              <Input
                placeholder="博客標題"
                size="large"
                onChange={e => setArticleTitle(e.target.value)}
                value={articleTitle}
              />
            </Col>
            <Col
              span={8}
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button size="large" onClick={showDrawer}>圖片管理</Button> 
              <DatePicker
                placeholder="發布日期"
                size="large"
                value={releaseDate? moment(releaseDate, 'YYYY-MM-DD'): null}
                disabledDate={disabledDate}
                onChange={(date, dateString) => setReleaseDate(dateString)}
              />
               {/* 1. 判斷有沒有發布 有發布的話無論如何只能有發布文章的按紐 發布 有發布日期 或是 已經發布
               2. 判斷有沒有發布日期 有發布日期的話就是發布文章 沒有就是暫存 暫存是沒有發布日期 同時 沒有發布 */}
              {!isRelease && !releaseDate? 
               <Button size="large" type="primary" disabled={isRelease} onClick={saveArticle}>暫存文章</Button> :
              <Button type="primary" size="large" onClick={releaseAritcle}>
                發布文章
              </Button>}
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={24}>
              <TextArea
                rows={4}
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章簡介"
              />
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={24}>
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章簡介：" + introducehtml,
                }}
              />
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={24}>
              <LabelSelect labelInfo={labelInfo}
                           selectedItems={selectedItems}
                           selectLabelHandler={selectLabelHandler} 
                           ref={labelRef}/>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章內容"
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <PictureDrawer isDrawerShow={isDrawerShow} 
                     setIsDrawerShow={setIsDrawerShow}
                     fileList={fileList}
                     setFileList={setFileList}
                     articleId={articleId} />
    </WorkbanchWrapper>
  );
});
