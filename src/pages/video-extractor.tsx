import { extractTranscript, extractTranscriptInfo } from '@/api/outputs'
import { Button } from '@/components/ui/button';
import AppInput from '@/components/App/AppInput'
import LayoutMain from '@/components/Layouts/LayoutMain'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function VideoExtractor() {
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState('')
  const [transcript, setTranscript] = useState(null)
  const [transcriptShown, setTranscriptShown] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  async function extractYouTubeVideoId(_url: string) {
    let videoId;
    setLoading(true)
    
    // Check if the URL is in the format https://youtu.be/{videoId}
    const shortFormatMatch = _url.match(/youtu.be\/([a-zA-Z0-9_-]{11})/);
    if (shortFormatMatch) {
      videoId = shortFormatMatch[1];
    } else {
      // Check if the URL is in the format https://www.youtube.com/watch?v={videoId}
      const longFormatMatch = _url.match(/youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})/);
      if (longFormatMatch) {
        videoId = longFormatMatch[1];
      } else {
        // If the URL doesn't match any known format, return null or throw an error, based on your preference.
        videoId = null;
      }
    }

    console.log(videoId)

    if (videoId) {
      const transcript = await extractTranscript({
        id: videoId,
        raw_text: true
      })

      setLoading(false)
      setTranscript(transcript)
    }
    
  }

  function handleUrlChange (e: any) {
    setUrl(e.target.value)
  }

  async function getAnalysis() {
    setLoading(true)
    if (transcript) {
      const anlys = await extractTranscriptInfo({
        transcript,
      })
      setAnalysis(anlys.content)
      setLoading(false)
    }
  }

  const copy = async() => {
    if (analysis) {
      await navigator.clipboard.writeText(analysis)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1500);
    }
  }

  return (
    <div>
      <Card className={'max-w-2xl mx-auto mt-8'}>
        <CardHeader>
          <CardTitle>Youtube Transcript analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <AppInput
            placeholder='e.g. Best SEO tool'
            hint='Provide the complete youtube video url'
            label="Youtube video URL"
            prefix={<i className='i-tabler-key'></i>}
            value={url}
            onChange={handleUrlChange}
            suffix={loading ? <i className="i-tabler-loader"></i> : undefined}
          />
          <Button
            variant='secondary'
            className={`${loading ? 'opacity-50 pointer-events-none' : ''} mt-4 ml-auto mr-0`}
            suffixIcon={ loading ? 'i-tabler-loader' : 'i-tabler-brand-youtube' }
            suffixIconClass={`${loading && 'animate-spin'}`}
            onClick={() => extractYouTubeVideoId(url)}
          >
            Extract
          </Button>
        </CardContent>
      </Card>
      {
        transcript && <div
          className="prose mx-auto w-full max-w-2xl"
        >
          <div className='mx-auto w-full flex flex-wrap items-center justify-center my-4 gap-4'>
            <Button
              onClick={() => setTranscriptShown(!transcriptShown)}
            >
              {transcriptShown ? 'Hide' : 'Show'} Transcript
            </Button>
            <Button
              className={`${loading ? 'opacity-50 pointer-events-none' : ''}`}
              variant="secondary"
              suffixIcon={ loading ? 'i-tabler-loader' : '' }
              suffixIconClass={`${loading && 'animate-spin'}`}
              onClick={
                () => getAnalysis()
              }
            >
              Get transcript analysis
            </Button>
          </div>

          <div className="mb-8">
            { transcriptShown && <p className='border rounded-md bg-light-300 p-4 my-8'>{transcript}</p> }
            {
              analysis && <div className='p-4 border bg-light-300'>
                <Button className='ml-auto' square={true} onClick={() => copy()}>
                  <i className={`text-xl ${copied ? 'i-tabler-check' : 'i-tabler-copy'}`}></i>
                </Button>
                <ReactMarkdown className='prose prose-md'>
                  { analysis }
                </ReactMarkdown>
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

VideoExtractor.getLayout = function getLayout(page: any) {
  return (
    <LayoutMain>
      {page}
    </LayoutMain>
  )
}

export default VideoExtractor