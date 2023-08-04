const { Downloader, YtdlMp3Error } = require('ytdl-mp3');
const usetube = require('usetube');

class YoutubeMusicDownloader {
    async download(videoName) {
        const downloader = new Downloader({
            outputDir: './files',
            getTags: false,
        });

        const videoData = await this.searchYoutubeVideo(videoName);

        if(!videoData.error) {
            try {
                const path = await downloader.downloadSong(videoData.url);
        
                return {
                    error: false,
                    path: path
                }
            } catch (e) {
                if(e instanceof YtdlMp3Error) {
                    return {
                        error: true,
                        message: "Não consegui baixar não, pode ser que tenha restrição de idade"
                    }
                }
            }
        } else {
            return videoData;
        }
    }

    async downloadFromUrl(videoUrl) {
        const downloader = new Downloader({
            outputDir: './files',
            getTags: false,
        });

        try {
            const path = await downloader.downloadSong(videoUrl);
    
            return {
                error: false,
                path: path
            }
        } catch (e) {
            if(e instanceof YtdlMp3Error) {
                return {
                    error: true,
                    message: "Não consegui baixar não, pode ser que tenha restrição de idade"
                }
            }
        }
    }
  
    async searchYoutubeVideo(videoName) {
        const searchResults = await usetube.searchVideo(videoName);

        if(searchResults.videos.length > 0) {
            return {
                error: false,
                name: searchResults.videos[0].original_title,
                url: `https://www.youtube.com/watch?v=${searchResults.videos[0].id}`
            }
        }

        return {
            error: true,
            message: "Nenhum video encontrado"
        }
    }
}

module.exports = { YoutubeMusicDownloader };
