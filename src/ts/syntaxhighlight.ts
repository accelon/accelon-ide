import {OFFTAG_REGEX_G,HTMLTAG_REGEX_G} from 'ptk/offtext/constants.ts'
export const hightLightOfftext=(doc)=>{
  doc.cm.startOperation();
  const {from,to}=doc.cm.getViewport();
  const marks=doc.findMarks({line:from-1},{line:to}); // findMarks starts from end of from, need to -1
  marks.forEach(it=>it.clear());
  let extra=0,j;
  for (let i=from;i<to;i++){
  	  const line=doc.getLine(i);
      const attrsAt=[];
  	  line.replace(OFFTAG_REGEX_G,(m,m1,m2,idx)=>{
        doc.markText({line:i,ch:idx},{line:i,ch:idx+m1.length+1},{className:'offtagname'});
        doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{className:'offtag'});
        attrsAt.push(idx+m1.length+1);
  	  })
      line.replace(HTMLTAG_REGEX_G,(m,m1,idx)=>{
        if (attrsAt.indexOf(idx)==-1) {
           doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{className:'htmltag'});
        } 
      })
  }
  doc.cm.endOperation();
}