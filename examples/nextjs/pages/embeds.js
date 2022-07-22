import { ConvoEmbed, CommentEmbed } from '@theconvospace/react';

export default function Page() {
    return (
        <div style={{ backgroundColor: "black" }}>
            <ConvoEmbed embedConfig={{
                threadId: "KIGZUnR4RzXDFheXoOwo",
                url: "https://theconvo.space/",
                theme: "dark",
                width: "700px",
                height: "500px"
            }} loading="eager" width="700px" height="550px" />

            <br /><br /><br />

            <CommentEmbed config={{ commentId: "01g40c9sx52cp69hqa155wt2yd" }} width="500px" height="300px" />

        </div>
    )
}
