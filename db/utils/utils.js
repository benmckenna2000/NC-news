

exports.formatDates = list => {
    
    const newTime =list.map((article) => {
        return {
            title: article.title,
            topic: article.topic,
            author: article.author,
            body: article.body,
            created_at: new Date(article.created_at),
            votes: article.votes
          }
        })
    return newTime
    };


exports.makeRefObj = list => {
    const lookup = {}
    list.forEach((article) => {
        const key = article.title
        const value = article.article_id
        lookup[key] = value
    })
    return lookup
    
}


exports.formatComments = (comments, articleRef) => {
    return comments.map(({ created_by, belongs_to, created_at, ...rest}) => {
        return {created_at: new Date(created_at), author:created_by, article_id: articleRef[belongs_to], ...rest}
    })
};
