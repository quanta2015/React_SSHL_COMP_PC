## test

Demo:

```tsx
import React from 'react';
import Editor from '@/components/form/RichText';



export default class Conf extends React.Component {

  constructor(props) {
    super(props)
  }
  


  render() {
    
    const props = {
      value:'',
      onChange: ()=>{}
    }

    return (
      <Editor {...props}/>
    )
  }
};
```
