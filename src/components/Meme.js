import React from "react"

export default function Meme()
{ 
	const [meme, setMeme] = React.useState({
		topText: "",
		bottomText: "",
		randomImage: "",
	})

	const [allMeme, setAllMeme] = React.useState([])

	React.useEffect(() => {
		async function getMemes() {
			const res = await fetch("https://api.imgflip.com/get_memes")
       		const data = await res.json()
        	setAllMeme(data.data.memes)
		}
		getMemes()
	}, [])

	function handleChangeText(event)
	{
		setMeme(prevMeme => ({
			...prevMeme,
			[event.target.name]: event.target.value
		}))
	}

	function getMemeImage() {
		const memesArray = allMeme;
		const randomNumber = Math.floor(Math.random() * memesArray.length);
		setMeme(prevMeme => ({
			...prevMeme,
			randomImage: memesArray[randomNumber].url
		}))
	}

	return (
		<main>
			<div className="form">
				<input 
					type="text"
					placeholder="Top text"
					className="form--input"
					name="topText"
					value={meme.topText}
					onChange={handleChangeText}
					/>
				<input 
					type="text"
					placeholder="Bottom text"
					className="form--input"
					name="bottomText"
					value={meme.bottomText}
					onChange={handleChangeText}
					/>
				<button onClick={getMemeImage} className="form--button">Get a new meme image 🖼</button>
			</div>
			<div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

		</main>
	)
}