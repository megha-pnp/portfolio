import { useEffect, useState } from 'react'
import { defaultSiteData } from '../utils/siteData'

export default function useSiteData(){
  const [siteData, setSiteData] = useState(()=>{
    try{ const raw = localStorage.getItem('siteData'); return raw ? JSON.parse(raw) : defaultSiteData() }catch(e){ return defaultSiteData() }
  })

  useEffect(()=>{
    try{ localStorage.setItem('siteData', JSON.stringify(siteData)) }catch(e){}
  },[siteData])

  return [siteData, setSiteData]
}
