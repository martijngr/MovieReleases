//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MovieReleases.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class Watchlist
    {
        public Watchlist()
        {
            this.WatchListItem = new HashSet<WatchListItem>();
        }
    
        public int Id { get; set; }
    
        public virtual User User { get; set; }
        public virtual ICollection<WatchListItem> WatchListItem { get; set; }
    }
}
