import React, {PureComponent} from 'react';
import './About.css';

class About extends PureComponent {
    render(){
        return(
            <div className='about'>
        <div className='image-about'>
        </div>
        <div className='article'>
                <h3 className="article-header">About us</h3>
                <p className="article-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consectetur rhoncus dolor, non consequat nulla efficitur rhoncus. Nunc fringilla feugiat egestas. Sed condimentum commodo erat, bibendum mollis dolor bibendum ut. Etiam vitae dictum arcu. Quisque facilisis mauris id arcu dignissim accumsan. Curabitur volutpat nibh non consectetur sodales. Donec laoreet lobortis ipsum, at pretium ligula malesuada at. Pellentesque et velit nec mi sagittis posuere. Nunc ornare metus viverra, rutrum lectus eget, cursus orci. Proin fermentum dolor ac ipsum viverra, nec egestas mi faucibus. Etiam non viverra ex. Aliquam quis massa porttitor nulla accumsan lobortis ut at tellus. Integer sit amet elit quam.</p>
                <p className="article-paragraph">Sed pulvinar tincidunt porttitor. Donec facilisis faucibus augue. Etiam euismod augue nec sem luctus condimentum. Vestibulum eget sem ultricies diam condimentum pulvinar. Etiam euismod volutpat tempor. Mauris pharetra neque vel rhoncus posuere. Nunc nisl erat, congue sit amet ante sed, mattis congue ex. Vivamus viverra convallis nisl sed pharetra. Pellentesque ullamcorper nisi non metus lobortis hendrerit. Mauris dapibus suscipit nisi. Duis tincidunt tincidunt tortor, nec vulputate enim vehicula vitae. Morbi non cursus mauris. Nullam sit amet convallis nisi. Nullam hendrerit mauris quis ligula viverra, vitae malesuada tortor eleifend.</p>
                <p className="article-paragraph">Morbi ex ante, consequat in dolor at, tempus gravida enim. Aliquam posuere purus id velit consequat aliquam. Maecenas sodales vestibulum sem, et venenatis dui tincidunt vel. Nulla magna lorem, luctus bibendum tortor id, eleifend auctor augue. Curabitur at lacus sollicitudin, dignissim ante at, commodo lectus. Fusce et lorem tincidunt ipsum pretium efficitur vitae nec nunc. Aenean vehicula, velit in efficitur sollicitudin, elit sem iaculis est, at eleifend sapien tellus ut magna.</p>
                <img className='image-article' src="https://drrtestblob.blob.core.windows.net/images/blue-1326154_640.jpg"/>
                <p className="article-paragraph">Aliquam erat volutpat. Sed sed vehicula nulla. Integer ac justo nisl. Aliquam et elementum purus. Nam pellentesque nisl at suscipit accumsan. Quisque imperdiet ex lacinia ipsum cursus, ullamcorper aliquam nunc tempor. Pellentesque at augue turpis. Etiam eget accumsan ante.</p>
                <p className="article-paragraph">Donec viverra pellentesque ornare. Nulla facilisi. Vestibulum eu nulla nec sem ultrices euismod. Pellentesque posuere nulla varius lorem malesuada, ut molestie quam tincidunt. Mauris et erat non mauris facilisis congue. Morbi imperdiet, nunc eu pellentesque luctus, felis arcu rhoncus nisl, id pretium purus est quis turpis. In ipsum risus, semper sed pellentesque et, cursus ac justo. Phasellus ultrices facilisis eros, ac maximus metus varius a.</p>
          
        </div>
    </div>
        )
    }
};

export default About;